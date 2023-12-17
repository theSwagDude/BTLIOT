package com.example.mqtt.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import com.example.mqtt.model.MqttPublishModel;
import com.example.mqtt.model.MqttSubscribeModel;
import org.springframework.web.bind.annotation.RestController;


@Controller
@RequestMapping("/home")
public class HomeController {
    private RestTemplate rest = new RestTemplate();

    private String getData(Model model){
        List<MqttSubscribeModel> mqttSubscribeModels = Arrays.asList(
                rest.getForObject("http://localhost:8080/api/mqtt/subscribe?topic=esp32/sensor&wait_millis=2000",
                        MqttSubscribeModel[].class));
        System.out.println(mqttSubscribeModels.size());
        String temp = "No Data";
        if (mqttSubscribeModels.size() >0) temp = mqttSubscribeModels.get(mqttSubscribeModels.size()-1).getMessage();
//        model.addAttribute("temp",temp);
        return temp;
    }
    @GetMapping("/list")
    public String home(){
        return "index.html";
    }


    @PostMapping("/publishdata")
    public String sendDataToMqtt(@ModelAttribute("publist") MqttPublishModel mqttPublisher) {
        try {
            String MQTT_PUBLISH_API = "http://localhost:8080/api/mqtt/publish?"
            		+ "topic=" + mqttPublisher.getTopic()
            		+ "message=" + mqttPublisher.getMessage()
            		+ "retained=" + mqttPublisher.getRetained()
            		+ "qos=" + mqttPublisher.getQos();
            rest.postForLocation(MQTT_PUBLISH_API, mqttPublisher);
            System.out.println("Message : "+ mqttPublisher.getMessage() +" published successfully");
        } catch (Exception e) {
            System.out.println("Failed to publish message");
        }
        return "index.html";
    }

}
