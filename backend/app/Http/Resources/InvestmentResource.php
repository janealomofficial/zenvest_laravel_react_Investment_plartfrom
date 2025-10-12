<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Transform an Investment instance into JSON.
 */
class InvestmentResource extends JsonResource
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
            'investor' => new UserResource($this->whenLoaded('investor')),
            'application' => new ApplicationResource($this->whenLoaded('application')),
            'amount' => $this->amount,
            'investment_date' => $this->investment_date,
            'status' => $this->status,
            'profit' => $this->profit,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}