package com.example.mqtt.config;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import java.util.UUID;

public class mqtt {
	private static final String MQTT_PUBLISHER_ID = "clientId-" + UUID.randomUUID().toString();
	private static final String MQTT_SERVER_ADDRES = "tcp://broker.hivemq.com:1883";
	private static IMqttClient instance;

	public static IMqttClient getInstance() {
		try {
			if (instance == null) {
				instance = new MqttClient(MQTT_SERVER_ADDRES, MQTT_PUBLISHER_ID);
			}

			MqttConnectOptions options = new MqttConnectOptions();
			options.setAutomaticReconnect(true);
			options.setCleanSession(true);
			options.setConnectionTimeout(10);

			if (!instance.isConnected()) {
				instance.connect(options);
				System.out.println("Không thể kết nối với MQTT broker.");
			}else {
				System.out.println("Đã kết nối với MQTT broker.");
			}
			
		} catch (MqttException e) {
			e.printStackTrace();
		}

		return instance;
	}

	private mqtt() {

    }
}
