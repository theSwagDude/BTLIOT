package com.example.mqtt.model;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class SensorData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double humidity;
    private Double temperature;
    private Double soil_moisture;
    private Integer float_switch;
    private Boolean RELAY_PIN_1;
    private Boolean RELAY_PIN_2;
    private Date timestamp;

    // getters and setters
}