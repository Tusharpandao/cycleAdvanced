package com.itrosys.cycle_engine.repository;

import com.itrosys.cycle_engine.entity.Cart;
import com.itrosys.cycle_engine.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUser(Users user);
}
