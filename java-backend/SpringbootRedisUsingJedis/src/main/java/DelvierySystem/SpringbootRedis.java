package DelvierySystem;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableRedisRepositories

@EnableSwagger2
@SpringBootApplication
public class SpringbootRedis {

	private static final Logger LOG = LoggerFactory.getLogger(SpringbootRedis.class);
	
	// Main program to start up the spring boot application.
	public static void main(String[] args) {
		SpringApplication.run(SpringbootRedis.class, args);
		LOG.info("Springboot redis application is started successfully.");
	}

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)			
				.select().apis(RequestHandlerSelectors.any())
				.paths(p-> true)				
				.build();
	}
}
