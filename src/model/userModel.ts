import db from "../db/pasteleria.json";
import jsonfile from "jsonfile";
import { randomUUID } from "node:crypto";
import crypto from "node:crypto";



abstract class UserModel {
  static readUser = () => {
    const mapedUsers = db.employees.map(employee => ({
      username: employee.username,
      age: employee.age,
      email: employee.email,

    }))
    return mapedUsers;
  }

  static crateUser = (objUser: any) => {
    const { employee, username, age, phone, password, email } = objUser;
    const user = db.employees.find((user: any) => user.email === email);
    if (user) {
      return { error: "Existing employee" };
    }

    const newEmployee = { employee, username, age, phone, password, email, token: "" }
    db.employees.push(newEmployee);

    jsonfile.writeFileSync("./src/db/pasteleria.json", db);

    return { message: "Employee created successfully" };
  }


  static readUserByEmail = (email: string) => {
    const user = db.employees.find((u) => u.email === email);
    if (!user) return 404;
    return user;
  };

  static updateUser = (objUser: any) => {
    try {
      const { employee, username, age, phone, password, email, token } = objUser;

      const user = db.employees.find((n) => n.username === username);

      if (!user) {
        return { error: "User not found" };
      }

      if (username) user.username = username;
      if (employee) user.employee = employee;
      if (age) user.age = age;
      if (phone) user.phone = phone;
      if (password) user.password = password;
      if (email) user.email = email;
      if (token) user.token = token;


      jsonfile.writeFileSync("./src/db/pasteleria.json", db);
    } catch (error) {
      return new Error();
    }
    return { message: "Successfully modified user" };
  };



  static deleteUser = (username: string) => {
    const user = db.employees.find((n) => n.username.toLowerCase() === username.toLowerCase());
    if (!user) {
      return { error: "user not found" };
    }
    const employees = db.employees.filter((employee) => employee.username.toLowerCase() !== username.toLowerCase());
    db.employees = employees;

    jsonfile.writeFileSync("./src/db/pasteleria.json", db);

    return { message: "Successfully delete user" };
  };

  static login = (objUser: any) => {
    try {
      const { username, password } = objUser;

      const user = db.employees.find((u) => u.username.toLowerCase() === username.toLowerCase());

      if (!user) return { error: "Existing user" };

      const hashPassword = crypto.createHash("sha256").update(password).digest("hex");

      if (user.password !== hashPassword) return { error: "Bad request" };


      const token = randomUUID();

      user.token = token;

      jsonfile.writeFileSync("./src/db/pasteleria.json", db);
    } catch (error) {
      return new Error();
    }
    return { message: "Logged User" };
  };


  static logout = (username: string) => {
    const user = db.employees.find((u) => u.username === username);

    if (!user) return { error: "user not found" };

    user.token = "";

    jsonfile.writeFileSync("./src/db/pasteleria.json", db);

    return { message: "Log out User" };
  };







}





export { UserModel };