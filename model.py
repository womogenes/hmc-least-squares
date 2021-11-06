# Keeping everything in this file for now.
import numpy as np
from numpy.polynomial import Polynomial


def import_data(path):
    """
    Imports data from given path.
    Returns two np arrays, x and y.
    """
    with open(path) as fin:
        lines = [line.split("\t") for line in fin.read().strip().split("\n")]
        n = len(lines)
        x = np.array([float(line[0]) for line in lines])
        y = np.array([float(line[1]) for line in lines])
        return x, y


def S(p, data):
    """
    Evaluates a polynomial of type np.polynomial.Polynomial
        with least squares based on given data.
    """
    pass


sample_path = "./sample_data/sample1.txt"
sample_data = import_data(sample_path)
