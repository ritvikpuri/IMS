package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Classes.Request;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long>{

	List<Request> findByActive(boolean active);
	
	void deleteById(long id);
	
	Request findByItemName(String name);
}
