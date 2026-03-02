<?php

use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\LeaveRequestController;
use App\Http\Controllers\Api\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    // Employees
    Route::apiResource('employees', EmployeeController::class);
    
    // Students
    Route::apiResource('students', StudentController::class);
    
    // Departments
    Route::apiResource('departments', DepartmentController::class);
    
    // Attendances
    Route::apiResource('attendances', AttendanceController::class);
    
    // Leave Requests
    Route::apiResource('leave-requests', LeaveRequestController::class);
    
    // Custom routes for leave requests
    Route::post('leave-requests/{leaveRequest}/approve', [LeaveRequestController::class, 'approve']);
    Route::post('leave-requests/{leaveRequest}/reject', [LeaveRequestController::class, 'reject']);
    
    // Employee statistics
    Route::get('employees/{employee}/attendances', [EmployeeController::class, 'attendances']);
    Route::get('employees/{employee}/leave-requests', [EmployeeController::class, 'leaveRequests']);
});
