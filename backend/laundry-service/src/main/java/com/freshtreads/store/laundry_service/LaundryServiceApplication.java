package com.freshtreads.store.laundry_service;

import com.freshtreads.store.laundry_service.config.AdminConfig;
import com.freshtreads.store.laundry_service.config.TwilioConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({TwilioConfig.class, AdminConfig.class})
public class LaundryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LaundryServiceApplication.class, args);
	}

}
