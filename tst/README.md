# How to Run

1. Go back to project root in terminal

2. In terminal, run

    ```
    $ npm run test
    ```

# Caveats

- 'rewire' module doesn't play nicely with Jest module mocks
- String literals needed to be passed into jest.mock()
- Consider restructuring project for easier/simpler unit tests
    - Example: unit testing a function that relies on another in same file. Easier to split.
