package com.example.mqtt.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.mqtt.config.mqtt;
import com.example.mqtt.model.MqttPublishModel;
import com.example.mqtt.model.MqttSubscribeModel;
import com.example.mqtt.model.SensorData;
import com.example.mqtt.service.SensorDataService;
import com.example.springmqttdemo.exceptions.ExceptionMessages;
import com.example.springmqttdemo.exceptions.MqttException;
import com.google.gson.Gson;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/mqtt")
public class MqttController {

    @Autowired
    SensorDataService dataService;

    @PostMapping("/publish")
    public void publishMessage(@RequestBody @Valid MqttPublishModel messagePublishModel,
            BindingResult bindingResult) throws org.eclipse.paho.client.mqttv3.MqttException {
        if (bindingResult.hasErrors()) {
            throw new MqttException(ExceptionMessages.SOME_PARAMETERS_INVALID);
        }
        MqttMessage mqttMessage = new MqttMessage(messagePublishModel.getMessage().getBytes());
        mqttMessage.setQos(messagePublishModel.getQos());
        mqttMessage.setRetained(messagePublishModel.getRetained());
        mqtt.getInstance().publish(messagePublishModel.getTopic(), mqttMessage);
    }

    @GetMapping("/subscribe")
    public List<MqttSubscribeModel> subscribeChannel(@RequestParam(value = "topic") String topic,
            @RequestParam(value = "wait_millis") Integer waitMillis)
            throws InterruptedException, org.eclipse.paho.client.mqttv3.MqttException {
        List<MqttSubscribeModel> messages = new ArrayList<>();
        CountDownLatch countDownLatch = new CountDownLatch(10);
        mqtt.getInstance().subscribeWithResponse(topic, (s, mqttMessage) -> {
            MqttSubscribeModel mqttSubscribeModel = new MqttSubscribeModel();
            mqttSubscribeModel.setId(mqttMessage.getId());
            mqttSubscribeModel.setMessage(new String(mqttMessage.getPayload()));
            mqttSubscribeModel.setQos(mqttMessage.getQos());
            System.out.println(mqttSubscribeModel.getMessage());
            // luu vào mysql
            try {
                Gson gson = new Gson();
                SensorData data = gson.fromJson(mqttSubscribeModel.getMessage(), SensorData.class);
                System.out.println("Parsed data: " + data);
                data.setTimestamp(new Date());
                dataService.save(data);
            } catch (Exception e) {
                e.printStackTrace();
            }

//            System.out.println("Humidity: " + data.getHumidity());
//            System.out.println("Temperature: " + data.getTemperature());
//            System.out.println("Humidity: " + data.getFloat_switch());
//            System.out.println("Temperature: " + data.getRELAY_PIN_1());
            messages.add(mqttSubscribeModel);
            countDownLatch.countDown();
        });
        countDownLatch.await(waitMillis, TimeUnit.MILLISECONDS);
        return messages;
    }
}
