<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Department;
use Illuminate\Support\Facades\DB;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $engineeringDept = Department::where('name', 'Engineering')->first();
        $hrDept = Department::where('name', 'Human Resources')->first();
        $salesDept = Department::where('name', 'Sales')->first();
        $marketingDept = Department::where('name', 'Marketing')->first();

        $employees = [
            [
                'first_name' => 'Alice',
                'last_name' => 'Anderson',
                'email' => 'alice.anderson@company.com',
                'phone' => '555-0101',
                'position' => 'Senior Developer',
                'salary' => 95000.00,
                'hire_date' => '2022-01-15',
                'department_id' => $engineeringDept->id,
                'status' => 'active',
            ],
            [
                'first_name' => 'Bob',
                'last_name' => 'Baker',
                'email' => 'bob.baker@company.com',
                'phone' => '555-0102',
                'position' => 'Junior Developer',
                'salary' => 65000.00,
                'hire_date' => '2023-03-20',
                'department_id' => $engineeringDept->id,
                'status' => 'active',
            ],
            [
                'first_name' => 'Carol',
                'last_name' => 'Clark',
                'email' => 'carol.clark@company.com',
                'phone' => '555-0103',
                'position' => 'HR Manager',
                'salary' => 75000.00,
                'hire_date' => '2021-06-10',
                'department_id' => $hrDept->id,
                'status' => 'active',
            ],
            [
                'first_name' => 'David',
                'last_name' => 'Davis',
                'email' => 'david.davis@company.com',
                'phone' => '555-0104',
                'position' => 'Sales Representative',
                'salary' => 55000.00,
                'hire_date' => '2023-02-01',
                'department_id' => $salesDept->id,
                'status' => 'active',
            ],
            [
                'first_name' => 'Emma',
                'last_name' => 'Evans',
                'email' => 'emma.evans@company.com',
                'phone' => '555-0105',
                'position' => 'Marketing Specialist',
                'salary' => 60000.00,
                'hire_date' => '2022-09-15',
                'department_id' => $marketingDept->id,
                'status' => 'active',
            ],
        ];

        foreach ($employees as $employee) {
            Employee::create($employee);
        }
    }
}
