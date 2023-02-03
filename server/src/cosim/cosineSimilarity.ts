/**
 * Based on https://github.com/domeccleston/cosim
 */


/**
 * Computes the cosine similarity of two vectors.
 *
 * @param vector1 - The first vector. Can be an array of numbers or an object with numeric properties.
 * @param vector2 - The second vector. Must have the same type as `vector1`.
 * @returns The cosine similarity of both vectors.
 */
export function similarity(vector1: number[], vector2: number[]): number {
    const product = dotProduct(vector1, vector2);

    const magnitude1 = magnitude(vector1)
    const magnitude2 = magnitude(vector2)

    if (magnitude1 === 0 || magnitude2 === 0) {
        throw new Error("Magnitudes cannot be zero");
    }

    return product / (magnitude1 * magnitude2);
}

/**
 * Computes the dot product of two vectors.
 *
 * @param vector1 - The first vector. Can be an array of numbers or an object with numeric properties.
 * @param vector2 - The second vector. Must have the same type as `vector1`.
 * @returns The dot product of the two vectors.
 */
function dotProduct(vector1: number[], vector2: number[]): number {
    if (!Array.isArray(vector1) || !Array.isArray(vector2)) {
        throw new Error(`Both arguments must be number[]: vector1 has type ${typeof vector1} and vector2 has type ${typeof vector2}`)
    }

    if (vector1.length !== vector2.length) {
        throw new Error("Both arguments must have the same length");
    }

    if (!vector1.length || !vector2.length) {
        throw new Error("Vectors must not be of length 0");
    }

    let dotProduct = 0;
    for (let i = 0; i < vector1.length; i++) {
        if (typeof vector1[i]) dotProduct += vector1[i] * vector2[i];
    }
    return dotProduct;
}

export function magnitude(vector: number[]) {
    return Math.sqrt(vector.reduce((acc, value) => acc + value ** 2, 0));
}

export function calculateSimilarities(promptEmbedding: number[], championsEmbeddings: number[][]) {
    return championsEmbeddings.map(champEmbedding => similarity(promptEmbedding, champEmbedding))
}