define({
  api: [
    {
      type: "post",
      url: "/admin/register",
      title: "管理员账号注册",
      description: "<p>注册管理员账号</p>",
      name: "admin-register",
      group: "Admin",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "string",
              optional: false,
              field: "adminName",
              description: "<p>用户名</p>",
            },
            {
              group: "Parameter",
              type: "string",
              optional: false,
              field: "password",
              description: "<p>密码</p>",
            },
          ],
        },
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "json",
              optional: false,
              field: "result",
              description: "",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              '{\n    "success" : "true",\n    "result" : {\n        "admin_name" : "adminName",\n        "password" : "password"\n    }\n}',
            type: "json",
          },
        ],
      },
      sampleRequest: [
        {
          url: "http://localhost:8000/admin/register",
        },
      ],
      version: "1.0.0",
      filename: "src/routes/admin.route.js",
      groupTitle: "Admin",
    },
  ],
})
