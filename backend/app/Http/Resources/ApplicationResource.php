<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Transform a BusinessApplication instance into JSON.
 */
class ApplicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'business_name' => $this->business_name,
            'description' => $this->description,
            'category' => $this->category,
            'revenue' => $this->revenue,
            'profit' => $this->profit,
            'funding_amount' => $this->funding_amount,
            'pitch_deck' => $this->pitch_deck,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'owner' => new UserResource($this->whenLoaded('user')),
        ];
    }
}