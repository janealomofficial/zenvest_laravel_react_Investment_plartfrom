<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed initial data for testing. We create users and example
        // applications so the API can be explored immediately after running
        // migrations and seeders.
        $this->call([
            UserSeeder::class,
            ApplicationSeeder::class,
        ]);
    }
}
