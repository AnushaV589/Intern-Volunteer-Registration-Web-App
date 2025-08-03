package com.registration.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.registration.repository")
@EnableTransactionManagement
public class DatabaseConfig {
    // Database configuration is handled through application.properties
    // This class enables JPA repositories and transaction management
}