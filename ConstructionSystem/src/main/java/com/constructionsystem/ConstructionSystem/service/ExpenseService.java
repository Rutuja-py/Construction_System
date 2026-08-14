package com.constructionsystem.ConstructionSystem.service;

import com.constructionsystem.ConstructionSystem.dto.ExpenseRequest;
import com.constructionsystem.ConstructionSystem.dto.ExpenseResponse;
import com.constructionsystem.ConstructionSystem.entity.Expense;
import com.constructionsystem.ConstructionSystem.entity.Project;
import com.constructionsystem.ConstructionSystem.entity.User;
import com.constructionsystem.ConstructionSystem.repository.ExpenseRepository;
import com.constructionsystem.ConstructionSystem.repository.ProjectRepository;
import com.constructionsystem.ConstructionSystem.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            ProjectRepository projectRepository,
            UserRepository userRepository) {

        this.expenseRepository = expenseRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<ExpenseResponse> getAllExpenses() {

        return expenseRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public ExpenseResponse getExpenseById(Long id) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Expense not found with id: " + id));

        return convertToResponse(expense);
    }

    public List<ExpenseResponse> getExpensesByProject(
            Long projectId) {

        return expenseRepository.findAll()
                .stream()
                .filter(expense ->
                        expense.getProject() != null
                        && expense.getProject()
                                .getId()
                                .equals(projectId))
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public ExpenseResponse createExpense(
            ExpenseRequest request,
            Long userId) {

        Project project = projectRepository.findById(
                request.getProjectId()
        ).orElseThrow(() ->
                new RuntimeException("Project not found"));

        Expense expense = new Expense();

        expense.setProject(project);
        expense.setTitle(request.getTitle());
        expense.setDescription(request.getDescription());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setPaymentMethod(
                request.getPaymentMethod());

        expense.setStatus("PENDING");

        if (userId != null) {

            User user = userRepository.findById(userId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "User not found"));

            expense.setCreatedBy(user);
        }

        Expense savedExpense =
                expenseRepository.save(expense);

        return convertToResponse(savedExpense);
    }

    public ExpenseResponse updateExpense(
            Long id,
            ExpenseRequest request) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Expense not found with id: " + id));

        Project project = projectRepository.findById(
                request.getProjectId()
        ).orElseThrow(() ->
                new RuntimeException("Project not found"));

        expense.setProject(project);
        expense.setTitle(request.getTitle());
        expense.setDescription(request.getDescription());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setPaymentMethod(
                request.getPaymentMethod());

        Expense updatedExpense =
                expenseRepository.save(expense);

        return convertToResponse(updatedExpense);
    }

    public ExpenseResponse approveExpense(Long id) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Expense not found"));

        expense.setStatus("APPROVED");

        return convertToResponse(
                expenseRepository.save(expense));
    }

    public ExpenseResponse rejectExpense(Long id) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Expense not found"));

        expense.setStatus("REJECTED");

        return convertToResponse(
                expenseRepository.save(expense));
    }

    public void deleteExpense(Long id) {

        if (!expenseRepository.existsById(id)) {

            throw new RuntimeException(
                    "Expense not found with id: " + id);
        }

        expenseRepository.deleteById(id);
    }

    private ExpenseResponse convertToResponse(
            Expense expense) {

        ExpenseResponse response =
                new ExpenseResponse();

        response.setId(expense.getId());

        if (expense.getProject() != null) {

            response.setProjectId(
                    expense.getProject().getId());

            response.setProjectName(
                    expense.getProject().getName());
        }

        response.setTitle(expense.getTitle());
        response.setDescription(expense.getDescription());
        response.setAmount(expense.getAmount());
        response.setCategory(expense.getCategory());
        response.setExpenseDate(expense.getExpenseDate());
        response.setPaymentMethod(
                expense.getPaymentMethod());
        response.setStatus(expense.getStatus());

        if (expense.getCreatedBy() != null) {

            response.setCreatedById(
                    expense.getCreatedBy().getId());

            response.setCreatedByName(
                    expense.getCreatedBy().getName());
        }

        return response;
    }
}