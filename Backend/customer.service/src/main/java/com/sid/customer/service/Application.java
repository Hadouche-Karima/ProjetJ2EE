package com.sid.customer.service;


import com.sid.customer.service.entities.Customers;
import com.sid.customer.service.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	@Bean
	CommandLineRunner start(CustomerRepository customerRespository,
							RepositoryRestConfiguration repositoryRestConfiguration){
		repositoryRestConfiguration.exposeIdsFor(Customers.class);
		return args -> {
			customerRespository.save(new Customers(null,"Mohamed","med@gmail.com"));
			customerRespository.save(new Customers(null,"Hassan","hassan@gmail.com"));
			customerRespository.save(new Customers(null,"salima","salima@gmail.com"));
			customerRespository.findAll().forEach(c->{
				System.out.println(c.toString());
			});
		};
	}
}
