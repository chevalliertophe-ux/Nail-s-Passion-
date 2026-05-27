import 'package:flutter/material.dart';

class AdminPage extends StatelessWidget {
  const AdminPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,

      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text("Admin"),
      ),

      body: Center(
        child: Container(
          padding: const EdgeInsets.all(40),

          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.05),
            borderRadius: BorderRadius.circular(30),

            boxShadow: [
              BoxShadow(
                color: Colors.pinkAccent.withOpacity(0.3),
                blurRadius: 30,
              ),
            ],
          ),

          child: const Column(
            mainAxisSize: MainAxisSize.min,

            children: [

              Icon(
                Icons.lock,
                color: Colors.pinkAccent,
                size: 80,
              ),

              SizedBox(height: 20),

              Text(
                "Espace Admin",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
