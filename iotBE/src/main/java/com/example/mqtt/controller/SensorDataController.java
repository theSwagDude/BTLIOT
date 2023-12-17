/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.mqtt.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.mqtt.model.SensorData;
import com.example.mqtt.service.SensorDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author HP
 */

@RestController
@CrossOrigin
@RequestMapping("/data")
public class SensorDataController {
   
    @Autowired
    SensorDataService dataService;
    
    @GetMapping("/sensor")  
    public List<SensorData> getAll()
    {
        return dataService.getAllSensorData();
    }
}
