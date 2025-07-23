


# Project Setup Guide

This repository contains both the **Frontend** and **Backend** of the application.

---

## 📁 Frontend

### 🔧 Installation

Install all necessary dependencies:

```bash
npm install
````

### ▶️ Run the Development Server

Start the frontend development server:

```bash
npm run dev
```

> The frontend usually runs on `http://localhost:3000` by default.

---

## 🖥️ Backend

### 🔧 Install Python Dependencies

Make sure you're in your virtual environment, then install the backend dependencies:

```bash
pip install -r requirements.txt
```

### 🧪 Create a virtual environment

Create a virtual environment

```bash
python -m venv venv
```

### 🧪 Activate Virtual Environment

Activate the virtual environment:

```bash
source venv/Scripts/activate
```

> If you're on macOS or Linux, use:

```bash
source venv/bin/activate
```

### 🚀 Run the FastAPI Server

Start the backend server with:

```bash
uvicorn app.main:app --reload
```

> The backend will run at `http://localhost:8000` by default.

---

Here’s an expanded and polished version of your **✅ Notes** section, including mentions of Git, XAMPP, Node.js, and Python:

---

## ✅ Notes

* Make sure you have the following installed on your system:

  * **Git** – for cloning repositories and version control.
  * **XAMPP** (or another local server) – if your project depends on a PHP/MySQL stack.
  * **Node.js** and **npm** – for managing frontend dependencies and running JavaScript-based tools.
  * **Python 3** – for backend development and scripting tasks.

* Always use a **virtual environment** for backend Python dependencies:

  ```bash
  python -m venv venv
  source venv/bin/activate  # or venv\Scripts\activate on Windows
  ```

* You can configure ports, API keys, database URLs, and other environment variables in a `.env` file or your project settings.

* Keep your tools updated regularly to avoid compatibility issues:

  * `git --version`
  * `node -v` and `npm -v`
  * `python --version`

* For web server functionality (like testing PHP or databases), ensure **XAMPP** services (Apache/MySQL) are running as needed.

---

## 🔐 How to Set MySQL Root Password via XAMPP Control Panel

### ✅ Step-by-Step Instructions:

1. ### **Open XAMPP Control Panel**

   * Launch `XAMPP Control Panel` (search for it in Start Menu).
   * Start **Apache** and **MySQL** by clicking the **Start** buttons.

2. ### **Click “Shell” Button**

   * In the XAMPP Control Panel, click the **"Shell"** button (top-right).
   * This opens a terminal window (similar to Command Prompt) with XAMPP paths preloaded.

3. ### **Enter MySQL Console**

   In the Shell window, type:

   ```bash
   mysql -u root
   ```

   > You should now see the MySQL prompt: `mysql>`

4. ### **Set the Root Password**

   At the MySQL prompt, type:

   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'root'
   FLUSH PRIVILEGES;
   ```

   * Replace `your_new_password` with your desired password.
   * Press **Enter** after each line.

5. ### **Exit MySQL**

   Type:

   ```sql
   exit;
   ```

6. ### **Update phpMyAdmin Config**

   * Open this file in a text editor:

     ```
     C:\xampp\phpMyAdmin\config.inc.php
     ```
   * Find the line:

     ```php
     $cfg['Servers'][$i]['password'] = '';
     ```
   * Change it to:

     ```php
     $cfg['Servers'][$i]['password'] = 'root';
     ```

7. ### **Restart MySQL**

   * Go back to the XAMPP Control Panel.
   * Click **Stop** on MySQL, wait a moment, then click **Start** again.

8. ### **Test Access**

   * Visit [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
   * It should now prompt for login if required, or log in automatically using the updated password.

---