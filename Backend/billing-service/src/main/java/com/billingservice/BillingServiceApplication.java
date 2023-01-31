package com.billingservice;

import com.billingservice.Entities.Bill;
import com.billingservice.Entities.ProductItem;
import com.billingservice.Models.Customer;
import com.billingservice.Models.Product;
import com.billingservice.Repositories.BillRepository;
import com.billingservice.Repositories.ProductItemRepository;
import com.billingservice.feign.CustomerRestClient;
import com.billingservice.feign.ProductItemRestClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.PagedModel;

import java.util.Collection;
import java.util.Date;
import java.util.Random;

@EnableFeignClients
@SpringBootApplication
public class BillingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner start(BillRepository billRepository,
							ProductItemRepository productItemRepository,
							CustomerRestClient customerRestClient,
							ProductItemRestClient productItemRestClient){
		return  args -> {

			Customer customer=customerRestClient.getCustomerById(1L);
			Bill bill1=billRepository.save(new Bill(null,new Date(),null, customer.getId(),null));
			PagedModel<Product> productPagedModel=productItemRestClient.pageProducts();
			productPagedModel.forEach(p->{
				ProductItem productItem=new ProductItem();
				productItem.setPrice(p.getPrice());
				productItem.setQuantity(new Random().nextInt(100));
				productItem.setProductID(p.getId());
				productItem.setBill(bill1);
				productItemRepository.save(productItem);
			});
		};
	}
}
