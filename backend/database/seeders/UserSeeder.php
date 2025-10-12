<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Seed the users table with sample admin, investors and business owners.
 */
class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Investors
        User::updateOrCreate(
            ['email' => 'investor1@example.com'],
            [
                'name' => 'Investor One',
                'password' => Hash::make('password'),
                'role' => 'investor',
            ]
        );
        User::updateOrCreate(
            ['email' => 'investor2@example.com'],
            [
                'name' => 'Investor Two',
                'password' => Hash::make('password'),
                'role' => 'investor',
            ]
        );

        // Business owners
        User::updateOrCreate(
            ['email' => 'owner1@example.com'],
            [
                'name' => 'Owner One',
                'password' => Hash::make('password'),
                'role' => 'business_owner',
            ]
        );
        User::updateOrCreate(
            ['email' => 'owner2@example.com'],
            [
                'name' => 'Owner Two',
                'password' => Hash::make('password'),
                'role' => 'business_owner',
            ]
        );
    }
}