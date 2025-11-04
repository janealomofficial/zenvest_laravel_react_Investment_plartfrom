<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Monthly Profit Invoice</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; color: #333; }
        .header { text-align: center; margin-bottom: 20px; }
        .invoice-box {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        td, th {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th { background: #f8f8f8; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Monthly Profit Invoice</h2>
        <p><strong>{{ $business_name }}</strong></p>
    </div>

    <div class="invoice-box">
        <table>
            <tr><th>Month</th><td>{{ $month }}</td></tr>
            <tr><th>Year</th><td>{{ $year }}</td></tr>
            <tr><th>Total Profit</th><td>${{ number_format($profit_amount, 2) }}</td></tr>
            <tr><th>Platform Fee</th><td>${{ number_format($platform_fee_amount, 2) }}</td></tr>
            <tr><th>Owner Share</th><td>${{ number_format($owner_share_amount, 2) }}</td></tr>
            <tr><th>Created At</th><td>{{ $created_at->format('Y-m-d') }}</td></tr>
        </table>

        <p style="margin-top:20px; text-align:center;">Thank you for your submission!</p>
    </div>
</body>
</html>
