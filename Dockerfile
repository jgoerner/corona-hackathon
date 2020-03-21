FROM openjdk:10-jdk-alpine

VOLUME /tmp

COPY build/*.jar app.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
