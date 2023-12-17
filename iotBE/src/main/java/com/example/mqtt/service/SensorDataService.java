package com.example.mqtt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mqtt.model.SensorData;
import com.example.mqtt.repository.SensorDataRepository;

@Service
public class SensorDataService {
	@Autowired
	private SensorDataRepository sensorDataRepository;

	public void save(SensorData sensorData) {
		sensorDataRepository.save(sensorData);
	}
	
	public List<SensorData> getAllSensorData(){
		return sensorDataRepository.findAll();
	}

}