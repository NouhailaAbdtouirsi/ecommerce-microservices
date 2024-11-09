package org.sid.billingservice.services;

import org.sid.billingservice.model.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "COSTUMER-SERVICE")
public interface CustomerRestClient {
    @GetMapping(path = "/customers/{id}")
    public Customer findCustomerById(@PathVariable Long id);
}
