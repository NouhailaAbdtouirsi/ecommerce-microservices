package org.sid.billingservice.web;

import lombok.AllArgsConstructor;
import org.sid.billingservice.entities.Bill;
import org.sid.billingservice.repositories.*;
import org.sid.billingservice.services.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class BillRestController {
    private BillRepository billRepository;
    private ProductItemRepository productItemRepository;
    private CustomerRestClient customerRestClient;
    private ProductRestClient productRestClient;

    @GetMapping(path = "/fullBill/{id}")
    public Bill bill( @PathVariable Long id){
        Bill bill = billRepository.findById(id).get();
        bill.setCustomer(customerRestClient.findCustomerById(bill.getCustomerId()));
        bill.getProductItems().forEach(pi -> {
            pi.setProduct(productRestClient.findProductById(pi.getProductId()));
        });
        return bill;
    }
}
