package com.example.demo;

import java.util.concurrent.Executor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

/**
 * The Class ApiConfig.
 */
@Configuration
@EnableAsync
public class ApiConfig {

	/**
	 * Factory bean.
	 *
	 * @return the free marker configuration factory bean
	 */
	@Primary
	@Bean
	public FreeMarkerConfigurationFactoryBean factoryBean() {
		
		FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
		bean.setTemplateLoaderPath("classpath:/templates");
		
		return bean;
	}
	
	/**
	 * Thread pool task executor.
	 *
	 * @return the executor
	 */
	@Bean(name = "threadPoolTaskExecutor")
    public Executor threadPoolTaskExecutor() {
        return new ThreadPoolTaskExecutor();
    }
}
