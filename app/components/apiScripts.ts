export type ApiScript = {
  label: string;
  cmd: string;
  lines: string[];
};

/* Cuplikan ILUSTRASI: sesuaikan endpoint dan isi response dengan project aslimu. */

export const AUTH_SCRIPTS: ApiScript[] = [
  {
    label: "Register",
    cmd: `curl -X POST /api/register -d '{"name":"Albar","email":"albar@mail.com","password":"secret123"}'`,
    lines: [
      `HTTP/1.1 201 Created`,
      `{`,
      `  "message": "User registered",`,
      `  "user": { "id": 1, "email": "albar@mail.com" }`,
      `}`,
    ],
  },
  {
    label: "Login",
    cmd: `curl -X POST /api/login -d '{"email":"albar@mail.com","password":"secret123"}'`,
    lines: [
      `HTTP/1.1 200 OK`,
      `{`,
      `  "message": "Login successful",`,
      `  "token": "1|Xk9f...q2Zt"`,
      `}`,
    ],
  },
  {
    label: "Profile",
    cmd: `curl /api/profile -H "Authorization: Bearer 1|Xk9f...q2Zt"`,
    lines: [
      `HTTP/1.1 200 OK`,
      `{`,
      `  "id": 1,`,
      `  "name": "Albar",`,
      `  "email": "albar@mail.com"`,
      `}`,
    ],
  },
  {
    label: "Admin only",
    cmd: `curl /api/admin/users -H "Authorization: Bearer <operator-token>"`,
    lines: [
      `HTTP/1.1 403 Forbidden`,
      `{`,
      `  "message": "This action is unauthorized."`,
      `}`,
    ],
  },
  {
    label: "Logout",
    cmd: `curl -X POST /api/logout -H "Authorization: Bearer 1|Xk9f...q2Zt"`,
    lines: [`HTTP/1.1 200 OK`, `{`, `  "message": "Logged out"`, `}`],
  },
];

export const INVENTORY_SCRIPTS: ApiScript[] = [
  {
    label: "Low stock",
    cmd: `curl /api/products?low_stock=true`,
    lines: [
      `HTTP/1.1 200 OK`,
      `{`,
      `  "data": [`,
      `    { "name": "Kabel LAN", "stock": 4 },`,
      `    { "name": "Mouse USB", "stock": 2 }`,
      `  ]`,
      `}`,
    ],
  },
  {
    label: "Stock IN",
    cmd: `curl -X POST /api/stock/in -d '{"product_id":1,"warehouse_id":1,"quantity":20}'`,
    lines: [
      `HTTP/1.1 201 Created`,
      `{`,
      `  "message": "Stock added",`,
      `  "stock": 24`,
      `}`,
    ],
  },
  {
    label: "Stock OUT",
    cmd: `curl -X POST /api/stock/out -d '{"product_id":1,"warehouse_id":1,"quantity":100}'`,
    lines: [
      `HTTP/1.1 422 Unprocessable Entity`,
      `{`,
      `  "message": "Insufficient stock",`,
      `  "available": 24`,
      `}`,
    ],
  },
  {
    label: "History",
    cmd: `curl /api/products/1/stock-history`,
    lines: [
      `HTTP/1.1 200 OK`,
      `{`,
      `  "data": [`,
      `    { "type": "IN",  "quantity": 20, "stock_after": 24 },`,
      `    { "type": "OUT", "quantity": 3,  "stock_after": 4 }`,
      `  ]`,
      `}`,
    ],
  },
  {
    label: "Dashboard",
    cmd: `curl /api/dashboard/summary`,
    lines: [
      `HTTP/1.1 200 OK`,
      `{`,
      `  "total_products": 42,`,
      `  "low_stock": 3,`,
      `  "transactions_today": 8`,
      `}`,
    ],
  },
];

export const WORKFLOW_SCRIPTS: ApiScript[] = [
  {
    label: "Draft",
    cmd: `curl -X POST /api/submissions -d '{"title":"Pengajuan Laptop"}'`,
    lines: [
      `HTTP/1.1 201 Created`,
      `{`,
      `  "id": 12,`,
      `  "status": "draft"`,
      `}`,
    ],
  },
  {
    label: "Submit",
    cmd: `curl -X POST /api/submissions/12/submit`,
    lines: [
      `HTTP/1.1 200 OK`,
      `{`,
      `  "id": 12,`,
      `  "status": "submitted"`,
      `}`,
    ],
  },
  {
    label: "Approve",
    cmd: `curl -X POST /api/submissions/12/approve`,
    lines: [
      `HTTP/1.1 200 OK`,
      `{`,
      `  "id": 12,`,
      `  "status": "approved"`,
      `}`,
    ],
  },
  {
    label: "Invalid state",
    cmd: `curl -X POST /api/submissions/12/reject`,
    lines: [
      `HTTP/1.1 422 Unprocessable Entity`,
      `{`,
      `  "message": "Invalid transition: approved -> rejected"`,
      `}`,
    ],
  },
  {
    label: "History",
    cmd: `curl /api/submissions/12/history`,
    lines: [
      `HTTP/1.1 200 OK`,
      `{`,
      `  "data": [`,
      `    { "from": null,        "to": "draft" },`,
      `    { "from": "draft",     "to": "submitted" },`,
      `    { "from": "submitted", "to": "approved" }`,
      `  ]`,
      `}`,
    ],
  },
];