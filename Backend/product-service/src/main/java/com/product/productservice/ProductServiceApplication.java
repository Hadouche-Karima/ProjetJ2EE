package com.product.productservice;

import com.product.productservice.Entities.Product;
import com.product.productservice.Repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class ProductServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner start(ProductRepository productRepository,
							RepositoryRestConfiguration repositoryRestConfiguration){
		repositoryRestConfiguration.exposeIdsFor(Product.class);
		return args->{
			productRepository.save(new Product(null,"ordinateur",788,13));
			productRepository.save(new Product(null,"phone",100,14));
			productRepository.save(new Product(null,"imprimante",788,13));
			productRepository.findAll().forEach(p->{
				System.out.println(p.toString());
			});
		};
	}
}
