package com.example.mqtt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mqtt.model.SensorData;

public interface SensorDataRepository extends JpaRepository<SensorData, Long>{

}
