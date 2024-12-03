package org.sid.costumerservice.config;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "costumer.params")
public record CustomerConfigParams(int x, int y) {
}