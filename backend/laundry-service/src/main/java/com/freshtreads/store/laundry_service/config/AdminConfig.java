package com.freshtreads.store.laundry_service.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Map;

@Data
@ConfigurationProperties(prefix = "admin")
public class AdminConfig {
    private Map<String, String> users; // ✅ expects string keys
}
