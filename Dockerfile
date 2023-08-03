# Use the official OpenJDK image as the base image
FROM openjdk:17-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file into the container
COPY target/your-app.jar app.jar

# Expose the port your Spring Boot application is listening on
EXPOSE 8080

# Define the command to run your application
CMD ["java", "-jar", "app.jar"]
