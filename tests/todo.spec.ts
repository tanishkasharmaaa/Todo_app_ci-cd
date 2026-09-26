import {expect, test} from "@playwright/test";

// Registration tests
test("regisrtaion show error when name,email,password is empty",async({page})=>{
  await page.goto("/registration")

  await page.getByRole("button",{name:"Register"}).click()
 
  await expect(page.getByText("Name is required")).toBeVisible()
  await expect(page.getByText("Email is required")).toBeVisible() 
  await expect(page.getByText("Password is required")).toBeVisible()
})

test("regisration show error when name length is less than 2",async({page})=>{
  await page.goto("/registration")
  let nameInput = page.getByRole("textbox",{name:"Name"})
  await nameInput.fill("A")
  await page.getByRole("button",{name:"Register"}).click()
  await expect(page.getByText("Name must be at least 2 characters")).toBeVisible()

})

test("registration error come when email is invalid",async({page})=>{
  await page.goto("/registration")
  const emailInput = page.getByRole("textbox",{name:"Email"})
  await emailInput.fill("abc")
  await page.getByRole("button",{name:"Register"}).click()
  await expect(page.getByText(`Please enter a valid email`)).toBeVisible()


})

test("registration error show when password length is less than 6",async({page})=>{
  await page.goto("/registration")
  let passwordInput = page.getByRole("textbox",{name:"Password"})
  await passwordInput.fill("12345")
  await page.getByRole("button",{name:"Register"}).click()
  await expect(page.getByText("Password must be at least 6 characters")).toBeVisible()
})

test("user can register successfully",async({page})=>{
  await page.goto("/registration")

  const nameInput = page.getByRole("textbox", { name: "Name" });
  await nameInput.fill("John Doe");
  const emailInput = page.getByRole("textbox", { name: "Email" });
  await emailInput.fill("0K5E4@example.com");
  const passwordInput = page.getByRole("textbox", { name: "Password" });
  await passwordInput.fill("password123");

  await page.getByRole("button", { name: "Register" }).click();
  await expect(page).toHaveURL("/login");

})

// Login tests
test("login show error when email,password is empty",async({page})=>{
  await page.goto("/login")

  await page.getByRole("button",{name:"Login"}).click()
 
  await expect(page.getByText("Email is required")).toBeVisible() 
  await expect(page.getByText("Password is required")).toBeVisible()
})

test("login error come when email is invalid",async({page})=>{
  await page.goto("/login")
  const emailInput = page.getByRole("textbox",{name:"Email"})
  await emailInput.fill("abc")
  await page.getByRole("button",{name:"Login"}).click()
  await expect(page.getByText(`Please enter a valid email`)).toBeVisible()


})

test("login error show when password length is less than 6",async({page})=>{
  await page.goto("/login")
  let passwordInput = page.getByRole("textbox",{name:"Password"})
  await passwordInput.fill("12345")
  await page.getByRole("button",{name:"Login"}).click()
  await expect(page.getByText("Password must be at least 6 characters")).toBeVisible()
})

test("user can login successfully",async({page})=>{
  await page.goto("/login")

  const emailInput = page.getByRole("textbox", { name: "Email" });
  await emailInput.fill("0K5E4@example.com");
  const passwordInput = page.getByRole("textbox", { name: "Password" });
  await passwordInput.fill("password123");

  await page.getByRole("button", { name: "Login" }).click();
  await page.evaluate(()=>{
    localStorage.setItem("LoginData", JSON.stringify({
      email:"0K5E4@example.com",
      password:"password123"
    }));
  });
})

// Todo tests
test("user can add a todo",async({page})=>{
  await page.goto("/todos");
  
  const todoInput = page.getByRole("textbox",{
    name:"Enter your todo..."
  })

await page.getByRole("button",{name:"Add"}).click()

page.once("dialog",async(dialog)=>{
  expect(dialog.message()).toContain("Please enter a todo first!");
  await dialog.dismiss();
})
await page.getByRole("button",{name:"Add"}).click()
 
  await todoInput.fill("Cycling")
  await page.getByRole("button",{name:"Add"}).click()
  await expect(page.getByText("Cycling")).toBeVisible()

  const cyclingTodo = page.getByText("Cycling").locator("..").locator("..");
  await cyclingTodo.getByRole("checkbox").check()

  await page .getByRole("button", { name: "Delete Cycling" }) .click(); // Verify todo was deleted 
  await expect(page.getByText("Cycling")).not.toBeVisible();

})