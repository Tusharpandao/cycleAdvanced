package com.itrosys.cycle_engine.controller;

import com.itrosys.cycle_engine.dto.CartRequest;
import com.itrosys.cycle_engine.dto.CartResponse;
import com.itrosys.cycle_engine.entity.Cart;
import com.itrosys.cycle_engine.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {


    private CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }


    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody CartRequest cartRequest) {
        return ResponseEntity.ok(cartService.addToCart(cartRequest));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<CartResponse>> getCart() {
        return ResponseEntity.ok(cartService.getCart());
    }
}
