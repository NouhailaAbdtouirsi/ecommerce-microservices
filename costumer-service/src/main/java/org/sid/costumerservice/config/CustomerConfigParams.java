package org.sid.costumerservice.config;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "costumer.param")
public record CustomerConfigParams(int x, int y) {
}