# 🏥 Doctor Finder Project - گەتهەب
 
**Welcome to the Doctor Finder Project!**  
This project is a platform that helps patients easily connect with doctors and book appointments, inspired by platforms like Zocdoc. We're using **Java Spring Boot** for the backend, **React Native** for the mobile app, and **React** for the doctor and admin web interfaces.

---
[Watch the Git Tutorial Video Here!](https://www.youtube.com/watch?v=jfi9n4y-WFo)
 ---
## 🌟 Table of Contents
- [🚀 Project Overview](#-project-overview)
- [📂 Project Structure](#-project-structure)
- [⚙️ Git Setup](#️-git-setup)
  - [🔐 Setting Up SSH Key (for GitHub)](#-setting-up-ssh-key-for-github)
  - [📥 Cloning the Repository](#-cloning-the-repository)
  - [👩‍💻 Working with Git](#-working-with-git)
    - [🌿 Creating a New Branch](#-creating-a-new-branch)
    - [📤 Pushing Changes to GitHub](#-pushing-changes-to-github)
    - [📥 Pulling Changes from GitHub](#-pulling-changes-from-github)
    - [🔄 Merging Branches](#-merging-branches)
    - [⚔️ Solving Merge Conflicts](#-solving-merge-conflicts)
- [🔧 Final Notes](#-final-notes)

---

## 🚀 Project Overview

- **Backend**: Java Spring Boot (API and database integration)
- **Web (React)**: Doctor and Admin Portals
- **Mobile (React Native)**: Patient App for doctor search and appointment bookings

---

## 📂 Project Structure
 plaintext
/doctor-finder
 - │-
 - ├── /backend (Java Spring Boot) ;
 - ├── /web (React for doctor and admin portal); 
 - ├── /mobile (React Native for patient app);
 - └── /docs (project documentation);

# Doctor Finder Project

Welcome to the Doctor Finder Project! This guide will help you get started with Git, GitHub, and the development process for our project.

---

## 🛠️ Git Setup

If you’re new to Git or GitHub, follow these steps to get started:

### Step 1: Install Git
- [Download Git](https://git-scm.com/downloads) and install it for your operating system.
- After installation, open your terminal (or Git Bash on Windows), and configure your name and email:


---

## 🔐 Setting Up SSH Key (for GitHub)

1. **Check if you already have an SSH key**:  
    Open your terminal and run:
  
          ls -al ~/.ssh
      
    If you see `id_rsa` or `id_ed25519`, you already have an SSH key.

2. **Generating a new SSH key**:  
    If you don't have one, generate an SSH key by running the following command (replace `your_email@example.com` with your actual email):
    
   
       ssh-keygen -t ed25519 -C "your_email@example.com"
       
    Press Enter to accept the default file location, then create a passphrase or leave it blank if you don’t want one.

3. **Adding the SSH key to the SSH agent**:  


             
        eval "$(ssh-agent -s)"
        ssh-add ~/.ssh/id_ed25519
                 

5. **Adding the SSH key to your GitHub account**:  
   Copy the SSH key to your clipboard:
    
        
       cat ~/.ssh/id_ed25519.pub
                 
    Go to [GitHub SSH settings](https://github.com/settings/keys), click **New SSH Key**, and paste the copied key.

6. **Testing your connection**:  
    Run this command to check if the connection is successful:
    
                 
          ssh -T git@github.com
                 

---

## 📥 Cloning the Repository

1. Go to the project repository on GitHub.
2. Click the green **Code** button and select **SSH**.
3. Copy the SSH URL and run this command in your terminal:

                 
        git clone git@github.com:<your-username>/doctor-finder.git
                 

---

## 👩‍💻 Working with Git

### 🌿 Creating a New Branch
Each feature or bug fix should be done in its own branch to keep the code clean and organized.

1. **Check which branch you're on**:

            
        git branch
                 
    The `*` indicates the current branch.

2. **Create and switch to a new branch**:

         
       git checkout -b feature/your-feature-name
                 

3. **Check branches**:

            
       git branch
                   

---

### 📤 Pushing Changes to GitHub

1. **Stage your changes**:

                 
       git add .
                 

2. **Commit your changes**:

             
       git commit -m "Describe your changes"
                 

3. **Push the changes to GitHub**:

              
       git push origin feature/your-feature-name
                 

4. **Create a Pull Request (PR)**:  
    Go to GitHub, navigate to your repository, and you'll see a notification to create a PR. Click **Compare & Pull Request**.

---

### 📥 Pulling Changes from GitHub

1. **Fetch the latest changes**:

                 
       git fetch
                 

2. **Pull the latest changes into your branch**:

                 
       git pull origin main
                 

---

### 🔄 Merging Branches

After your feature is complete and reviewed, you’ll want to merge it into the `main` branch.

1. **Switch to the main branch**:

                 
       git checkout main
                 

2. **Pull the latest changes**:

                 
       git pull origin main
                 

3. **Merge your feature branch**:

                 
       git merge feature/your-feature-name
                 

4. **Push the changes to GitHub**:

                 
       git push origin main
                 

---

### ⚔️ Solving Merge Conflicts

If there are merge conflicts, Git will notify you. Here’s how to resolve them:

1. Open the conflicting files and manually fix the issues.
2. After resolving the conflict, stage the file:

                 
       git add <file-name>
   
                git add .   
it will add all of the doc           

3. Complete the merge:

                 
        git commit
                 

4. Push the changes:

                 
        git push origin main
                 

---

## 🔧 Final Notes

- Make sure to regularly pull from the `main` branch to keep your local codebase up to date.
- Use meaningful commit messages for better project tracking.
- If you encounter any issues, feel free to ask for help in the project chat or reach out to the team leads.

**Happy coding!** 🎉

