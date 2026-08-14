package com.constructionsystem.ConstructionSystem.controller;

import com.constructionsystem.ConstructionSystem.dto.ExpenseRequest;
import com.constructionsystem.ConstructionSystem.dto.ExpenseResponse;
import com.constructionsystem.ConstructionSystem.service.ExpenseService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // GET ALL EXPENSES
    @GetMapping
    public ResponseEntity<List<ExpenseResponse>> getAllExpenses() {

        return ResponseEntity.ok(
                expenseService.getAllExpenses()
        );
    }

    // GET EXPENSE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResponse> getExpenseById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                expenseService.getExpenseById(id)
        );
    }

    // GET EXPENSES BY PROJECT
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<ExpenseResponse>> getExpensesByProject(
            @PathVariable Long projectId) {

        return ResponseEntity.ok(
                expenseService.getExpensesByProject(projectId)
        );
    }

    // CREATE EXPENSE
    @PostMapping
    public ResponseEntity<ExpenseResponse> createExpense(
            @Valid @RequestBody ExpenseRequest request) {

        /*
         * For now userId is null.
         * Later, when authentication is connected,
         * we can get the logged-in user's ID from JWT.
         */
        ExpenseResponse expense =
                expenseService.createExpense(request, null);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(expense);
    }

    // UPDATE EXPENSE
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequest request) {

        return ResponseEntity.ok(
                expenseService.updateExpense(id, request)
        );
    }

    // APPROVE EXPENSE
    @PutMapping("/{id}/approve")
    public ResponseEntity<ExpenseResponse> approveExpense(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                expenseService.approveExpense(id)
        );
    }

    // REJECT EXPENSE
    @PutMapping("/{id}/reject")
    public ResponseEntity<ExpenseResponse> rejectExpense(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                expenseService.rejectExpense(id)
        );
    }

    // DELETE EXPENSE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpense(
            @PathVariable Long id) {

        expenseService.deleteExpense(id);

        return ResponseEntity.ok(
                "Expense deleted successfully"
        );
    }
}