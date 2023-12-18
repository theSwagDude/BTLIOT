#include <DHT.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#define DHTPIN 2         // GPIO kết nối với cảm biến DHT11
#define DHTTYPE DHT11    // Loại cảm biến DHT

DHT dht(DHTPIN, DHTTYPE);
#define SOIL_MOISTURE_PIN 35     // GPIO kết nối với cảm biến độ ẩm đất
#define FLOAT_SWITCH_PIN 19      // GPIO kết nối với cảm biến phao
#define RELAY_PIN_1 18           // GPIO kết nối với relay 1
#define RELAY_PIN_2 4            // GPIO kết nối với relay 2

const char* ssid = "BCC";
const char* password = "66668888";
//192.168.1.106      broker.hivemq.com
const char* mqtt_broker = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* mqtt_sensor_topic = "esp32/sensor";
const char* mqtt_relay_topic = "esp32/relay";
const char* mqtt_status_topic = "esp32/status";
const char* status = "1";
const char* relay_message = "";
bool relay1State = LOW;  // Ban đầu, relay 1 tắt
bool relay2State = LOW;  // Ban đầu, relay 2 tắt

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {

  Serial.begin(115200);
  
  Serial.print("Đang kết nối WiFi");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println(" Kết nối WiFi thành công");
  
  dht.begin();
  pinMode(FLOAT_SWITCH_PIN, INPUT_PULLUP);
  pinMode(RELAY_PIN_1, OUTPUT);
  pinMode(RELAY_PIN_2, OUTPUT);
  digitalWrite(RELAY_PIN_1, LOW);  // Ban đầu, tắt relay 1
  digitalWrite(RELAY_PIN_2, LOW);  // Ban đầu, tắt relay 2

  connectToMQTT();
}

void loop() {
  delay(3000);

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  int soilMoisture = analogRead(SOIL_MOISTURE_PIN);
  float percentMoisture = map(soilMoisture, 0, 4095, 0, 100);

  int floatSwitchState = digitalRead(FLOAT_SWITCH_PIN);

  if (floatSwitchState == HIGH) {
    Serial.println("Trạng thái cảm biến phao: Nước cao");
    digitalWrite(RELAY_PIN_1, HIGH);  // Bật relay 1 khi nước thấp
    relay1State = HIGH;
  } else {
    Serial.println("Trạng thái cảm biến phao: Nước thấp");
    digitalWrite(RELAY_PIN_1, LOW);  // Tắt relay 1 khi nước cao
    relay1State = LOW;
    
  }

  if(status == "1"){
    if(humidity > 10 || temperature > 10 || percentMoisture > 10){
      Serial.println("máy bơm tưới cây đang mở");
      digitalWrite(RELAY_PIN_2, HIGH);  // Bật relay 2 
      relay2State = HIGH;
    } else {
      Serial.println("máy bơm tưới cây đang tắt");
      digitalWrite(RELAY_PIN_2, LOW);  // Tắt relay 2   
      relay2State = LOW;
    }
  }else{
    if(relay_message == "ON"){
      Serial.println("máy bơm tưới cây đang mở");
      digitalWrite(RELAY_PIN_2, HIGH);  // Bật relay 2 
      relay2State = HIGH;
    }else{
      Serial.println("máy bơm tưới cây đang tắt");
      digitalWrite(RELAY_PIN_2, LOW);  // Tắt relay 2  
      relay2State = LOW;
    }
  }


  StaticJsonDocument<200> jsonDoc;
  jsonDoc["humidity"] = humidity;
  jsonDoc["temperature"] = temperature;
  jsonDoc["soil_moisture"] = percentMoisture;
  jsonDoc["float_switch"] = floatSwitchState;
  jsonDoc["RELAY_PIN_1"] = relay1State;
  jsonDoc["RELAY_PIN_2"] = relay2State;


  String jsonString;
  serializeJson(jsonDoc, jsonString);

  client.publish(mqtt_sensor_topic, jsonString.c_str());

  Serial.println(jsonString);
  client.loop();  // Đảm bảo rằng callback sẽ được gọi khi có tin nhắn mới từ MQTT
}


void connectToMQTT() {
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);

  while (!client.connected()) {
    Serial.print("Đang kết nối tới MQTT broker...");
    String clientId = "clientId-";
    clientId += String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str())) {
      Serial.println("Connected to " + clientId);
      client.subscribe(mqtt_sensor_topic);
      client.subscribe(mqtt_relay_topic);
      client.subscribe(mqtt_status_topic);
    } else {
      Serial.print(" Kết nối MQTT thất bại. Thử lại sau 5 giây...");
      delay(5000);
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message: ");
  Serial.println(message);

  // Xử lý tương tác từ MQTT với relay 2
  if (strcmp(topic, mqtt_relay_topic) == 0) {
    if (message == "ON") {
      digitalWrite(RELAY_PIN_2, HIGH);  // Bật relay 2
      relay_message = "ON";
      Serial.println("Bật Relay 2");
    } else if (message == "OFF") {
      digitalWrite(RELAY_PIN_2, LOW);  // Tắt relay 2
      relay_message = "OFF";
      Serial.println("Tắt Relay 2");
    }
  }

  if (strcmp(topic, mqtt_status_topic) == 0) {
    if (message == "ON") {
      status = "1";
      Serial.println("auto");
    } else if (message == "OFF") {
      status = "0";
      Serial.println("Thủ công");
    }
  }
}
