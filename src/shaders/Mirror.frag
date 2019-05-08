#version 330


uniform vec3 u_cam_pos;     // camera's position

uniform samplerCube u_texture_cubemap;

in vec4 v_position;         // fragment's position
in vec4 v_normal;
in vec4 v_tangent;

out vec4 out_color;

// Approximate the incoming radiance sample using an environment map:
// - a pre-computed store of dir-to-rad mapping (calculated explicitly via monte carlo integration)
// - Sample env map without shadow rays (assume no intersections with other parts of the scene)

void main() {

  // YOUR CODE HERE

  // Compute outgoing eye-ray (w0)
  vec3 wo = vec3(v_position) - u_cam_pos;

  // Reflect w0 across surface normal (v_normal) to get wi
  vec3 wi = reflect(wo, vec3(v_normal));

  // Finally, sample the env map u_texture_cubemap for the incoming direction wi
  out_color = texture(u_texture_cubemap, wi);

}
