def add_numbers(a, b):
    return a + b

if __name__ == "__main__":
    import sys
    num1 = int(sys.argv[1])
    num2 = int(sys.argv[2])
    print(add_numbers(num1, num2))
