package com.example.mqtt.model;

import lombok.Data;

@Data
public class MqttSubscribeModel {
    private Integer id;
    private String message;
    private Integer qos;
}
