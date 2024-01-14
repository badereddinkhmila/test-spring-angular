#STAGE 1 - Build the layered jar

FROM maven:3.9.6-amazoncorretto-21-al2023 AS builder
COPY src /home/app/src
COPY pom.xml /home/app

RUN mvn -f /home/app/pom.xml package
WORKDIR /home/app/target

RUN java -Djarmode=layertools -jar /home/app/target/*.jar extract

#STAGE 2 - Use the layered jar to run Spring Boot app

FROM openjdk:21-slim AS run
USER root
#Copy individual layers one by one
COPY --from=builder /home/app/target/dependencies/ ./
#Add this to fix a bug which happens during sequential copy commands
RUN true
COPY --from=builder /home/app/target/spring-boot-loader/ ./
RUN true
COPY --from=builder /home/app/target/snapshot-dependencies/ ./
RUN true
COPY --from=builder /home/app/target/custom-dependencies/ ./
RUN true
COPY --from=builder /home/app/target/application/ ./
#Expose port on which Spring Boot app will run
EXPOSE 8080
#Switch to non root user
USER 1001
#Start Spring Boot app
ENTRYPOINT ["java","org.springframework.boot.loader.launch.JarLauncher"]