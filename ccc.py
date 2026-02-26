A = int(input())
B = int(input())
K = int(input())
T = int(input())

D = abs(B - A)
if D == 0:
    print(0 if T == 1 else 2)
else:
    def hops(m):
        return m + abs(D - m * K)
    q = D // K
    c = [0, q, q + 1]
    if q > 0:
        c.append(q - 1)
    values = sorted(set(hops(m) for m in c if m >= 0))
    if T == 1:
        print(min(values))
    else:
        values.remove(min(values))
        print(min(values))
