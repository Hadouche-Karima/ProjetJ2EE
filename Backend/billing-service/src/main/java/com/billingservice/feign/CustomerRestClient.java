package com.billingservice.feign;

import com.billingservice.Models.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "CUSTOMER-SERVICE")
public interface CustomerRestClient {
    @GetMapping(path = "/customerses/{id}")
    public Customer getCustomerById(@PathVariable(name = "id") Long id);
}
