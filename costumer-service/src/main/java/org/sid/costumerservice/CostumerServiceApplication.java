package org.sid.costumerservice;

import org.sid.costumerservice.config.CustomerConfigParams;
import org.sid.costumerservice.entities.Customer;
import org.sid.costumerservice.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.List;

@SpringBootApplication
@EnableConfigurationProperties(CustomerConfigParams.class)
public class CostumerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CostumerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(CustomerRepository customerRepository,
                            RepositoryRestConfiguration repositoryRestConfiguration) {
        return args -> {
            repositoryRestConfiguration.exposeIdsFor(Customer.class);
            customerRepository.saveAll(
                    List.of(
                            Customer.builder().name("Nouhaila").email("nouha@gmail.com").build(),
                            Customer.builder().name("Yassine").email("yassine@gmail.com").build(),
                            Customer.builder().name("Mohamed").email("moha@gmail.com").build()
                    )
            );

            customerRepository.findAll().forEach(System.out::println);
        };
    }

}
