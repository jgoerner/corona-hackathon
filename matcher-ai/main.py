import matcher
import os

config_name = os.getenv('APP_SETTINGS')
if config_name is None:
    config_name = "development"
app = matcher.create_app(config_name)


def main():
    app.run(host="127.0.0.1", port=8000, debug=True)


if __name__ == '__main__':
    main()
