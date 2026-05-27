import 'package:flutter/material.dart';

class GalleryPage extends StatelessWidget {
  const GalleryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,

      body: GridView.count(
        padding: const EdgeInsets.all(20),
        crossAxisCount: 2,
        crossAxisSpacing: 15,
        mainAxisSpacing: 15,

        children: List.generate(
          8,
          (index) => Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(25),

              gradient: LinearGradient(
                colors: [
                  Colors.pinkAccent,
                  Colors.black,
                ],
              ),
            ),

            child: const Icon(
              Icons.photo,
              color: Colors.white,
              size: 50,
            ),
          ),
        ),
      ),
    );
  }
}
