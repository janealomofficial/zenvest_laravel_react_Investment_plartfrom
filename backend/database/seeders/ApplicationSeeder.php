<?php

namespace Database\Seeders;

use App\Models\BusinessApplication;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Seed the business_applications table with example applications for the
 * business owners defined in the UserSeeder.
 */
class ApplicationSeeder extends Seeder
{
    public function run(): void
    {
        $owner1 = User::where('email', 'owner1@example.com')->first();
        $owner2 = User::where('email', 'owner2@example.com')->first();

        if ($owner1) {
            BusinessApplication::updateOrCreate([
                'user_id' => $owner1->id,
                'business_name' => 'Tech Gadgets Ltd',
            ], [
                'description' => 'A company producing innovative tech gadgets for daily use.',
                'category' => 'Technology',
                'revenue' => 50000,
                'profit' => 12000,
                'funding_amount' => 20000,
                'status' => 'pending',
            ]);
        }
        if ($owner2) {
            BusinessApplication::updateOrCreate([
                'user_id' => $owner2->id,
                'business_name' => 'Organic Farms Co',
            ], [
                'description' => 'Organic farming business delivering fresh produce.',
                'category' => 'Agriculture',
                'revenue' => 30000,
                'profit' => 8000,
                'funding_amount' => 15000,
                'status' => 'pending',
            ]);
            BusinessApplication::updateOrCreate([
                'user_id' => $owner2->id,
                'business_name' => 'Handmade Crafts',
            ], [
                'description' => 'Artisans creating handmade crafts and souvenirs.',
                'category' => 'Art & Crafts',
                'revenue' => 10000,
                'profit' => 3000,
                'funding_amount' => 5000,
                'status' => 'pending',
            ]);
        }
    }
}